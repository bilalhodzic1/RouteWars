import {ArrowRight} from "lucide-react";

export default function BGPOverview({setSelectedIndex}) {
    return (
        <div className="max-w-3xl mx-auto py-10 px-6">
            <h1 className="text-4xl font-bold mb-4">
                Border Gateway Protocol
            </h1>
            <p className="text-gray-800 leading-relaxed mb-6">
                Border Gateway Protocol (BGP) is a routing protocol that enables the the global internet to function.
                BGP defines routes between networks and populates route tables on a global scale, allowing for the
                entire internet to function. Without BGP networks would not know how to communicate with one another,
                and the internet as we know would be fragmented and inaccessible.
            </p>
            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                How does BGP Work?
            </div>
            <p className="text-gray-800 leading-relaxed mb-6">
                To understand how BGP functions we first need to understand what components are involved in BGP. The
                main component is the Autonomous System (AS). An Autonomous System is a collection of routers under the
                same jurisdiction. Typically ASes are internet service providers, or government-controlled internet
                providers, and span a large range of devices. Each AS will need to maintain routes for all possible
                locations both within and outside of the network and these routes will need to be known by the entire
                network. To accomplish this, we introduce the next component, the BGP speaker. There are many BGP
                speakers in the network and each of them are responsible for pushing out local updates to their route
                tables to all other speakers in the network. Some speakers and internal and others communicate
                externally. The external communicating speakers exist on the border of the network, hence the name
                Border Gateway Protocol. These border nodes are responsible for pushing out relevant updates to
                neighboring ASes, the same way internal updates are pushed out to all the internal speakers.
            </p>
            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                How do speakers communicate with each other?
            </div>
            <p className="text-gray-800 leading-relaxed mb-6">
                BGP speakers communicate via a TCP connection. Typically, it is uncommon to see routing protocols
                communicate over TCP however communicating over TCP has many advantages that simplify the implementation
                of BGP. Some of these advantages include not explicitly needing to implement things like fragmentation,
                re-transmission, acknowledgement or sequencing.
                BGP starts by opening a connection on well-known port 179. Once this connection is made, BGP commands
                can be sent and received by both parties. The commands are the following
            </p>
            <p className="text-gray-800 leading-relaxed font-semibold">OPEN</p>
            <ul className="list-disc ml-6 space-y-2">
                <li>This is the first command sent by both parties once the TCP connection is open</li>
                <li>
                    The details included in the command are the following:
                    <ul className="list-[circle] ml-10 space-y-1">
                        <li>Version number (Currently BGP is on version 4)</li>
                        <li>Autonomous system number (ASN). This is an identifier for the autonomous system the speaker resides in</li>
                        <li>Hold time – Number of seconds a connection can stay open without hearing from the other node</li>
                        <li>BGP identifier – The unique identifier of the BGP speaker (IP address assigned to the node)</li>
                        <li>Optional Parameters length – Length of the optional parameters included</li>
                        <li>Optional Parameters – A list of optional parameters included with the command</li>
                    </ul>
                </li>
            </ul>

            <p className="text-gray-800 leading-relaxed mt-3 font-semibold">KEEPALIVE</p>
            <ul className="list-disc ml-6 space-y-2">
                <li>
                    This command keeps the connection open, sent periodically based on the hold time in the OPEN command. It also acknowledges the OPEN.
                </li>
                <li>KEEPALIVE does not include any information outside of the BGP header.</li>
            </ul>

            <p className="text-gray-800 leading-relaxed mt-3 font-semibold">UPDATE</p>
            <ul className="list-disc ml-6 space-y-2">
                <li>
                    The UPDATE command sends out route update info. Upon receiving an UPDATE, a BGP node updates its routes and propagates the UPDATE.
                </li>
                <li>
                    UPDATE includes the following extra information:
                    <ul className="list-[circle] ml-10 space-y-1">
                        <li>Withdrawn routes length – Length of the withdrawn routes section</li>
                        <li>Withdrawn routes – Routes being removed due to no longer being reachable or valid</li>
                        <li>Total path attribute length – Length of the total path attributes field</li>
                        <li>Total path attribute – Updated info about all route attributes (next hop, originator, etc.)</li>
                        <li>Network layer reachability information – List of destinations being updated</li>
                    </ul>
                </li>
            </ul>

            <p className="text-gray-800 leading-relaxed mt-3 font-semibold">NOTIFICATION</p>
            <ul className="list-disc ml-6 space-y-2">
                <li>The NOTIFICATION command indicates an error and immediately closes the connection.</li>
                <li>
                    NOTIFICATION includes the following extra information:
                    <ul className="list-[circle] ml-10 space-y-1">
                        <li>Error code – Identifies the error type (6 main types in the RFC)</li>
                        <li>Error subcode – Subtype identifier of the error</li>
                        <li>Data – Variable-length data sent with the error notification</li>
                    </ul>
                </li>
            </ul>


            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                How do routes propagate with BGP?
            </div>
            <p className="text-gray-800 leading-relaxed mb-6">
                Each BGP speaker as a local version of routes, an incoming route table, and an outgoing route table. All
                BGP speakers within in a network should contain all the same routes. There are 2 kinds of communication
                within BGP, internal and external. When an internal update is made, the results are only advertised to
                all the external facing nodes. When a new route or route update comes from an eternal source, say
                another AS, then the route is rebroadcasted to all nodes in the network, not just the external facing
                nodes. Within each row of the route table there are a few required parameters. One of these required
                parameters is origin, which indicates weather it came from an internal node or an external node. All of
                the BGP speakers within the AS are connected like a graph. There is some way to reach every other
                speaker from any given speaker. Because of this, when an external node sends and update to one of the
                border nodes, it will simply pass along the update info to the next node it is connected to. Then from
                there this node will see the origin was external, and send out updates then the cycle continues. When a
                BGP node receives an update, it stores the info first in its incoming route table. Then when it has the
                time it will process the incoming table and update its local table. Likewise, when a BGP node has
                updates it wants to send out, it will add these to its outgoing table and send these updates when it
                finds the time to do so.
            </p>
            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                How does BGP determine what route to use?
            </div>
            <p className="text-gray-800 leading-relaxed mb-6">
                We know how routes propagate, but how does each BGP speaker determine what route it should use? This
                implementation is actual up to each local node. Because the local node has an incoming route table, it
                can freely update its local table however it deems fit. BGP routes are policy-driven, meaning that it is
                up to the implementer to decide how it wants to prioritize routes. For instance, a business may
                prioritize keeping routes within its organization or preventing routes from certain places. Outside of
                this routing can also be based on metrics like shortest path, least number of hops, freshest information
                or any metric that the administrator chooses.
            </p>
            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                How are BGP routes defined?
            </div>
            <p className="text-gray-800 leading-relaxed mb-6">
                BGP routes are defined for an IP prefix. This means that one route entry can encapsulate many IP
                addresses in the same entry, preventing the need for a record for every IP. You can also include a route
                for a specific IP address within a prefix alongside the route entry for the entire prefix. BGP routing
                will always seek for the most specific route when routing somewhere, so if there are multiple matching
                entries, the most specific one is always chosen.
            </p>
            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                Impact of BGP
            </div>
            <p className="text-gray-800 leading-relaxed mb-6">
                BGP is the backbone for global internet communication, and yet we hardly ever hear about it or think
                about it. Without BGP there wouldn’t be a standardized way for networks to connect with each other,
                meaning the internet would be a partitioned mess of unreachable networks. BGP solves this problem in a
                simple to implement way and thus it has become the global standard.
            </p>
            <div className="flex justify-end mt-10">
                <button
                    onClick={() => {
                        setSelectedIndex(2)
                    }}
                    className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg flex gap-2 hover:bg-blue-700 transition"
                >
                    Next Section <ArrowRight/>
                </button>
            </div>
        </div>
    );
}
