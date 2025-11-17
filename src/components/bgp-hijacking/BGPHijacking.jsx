import {ArrowRight} from "lucide-react";

export default function BGPHijacking({setSelectedIndex}) {
    return (
        <div className="max-w-3xl mx-auto py-10 px-6">
            <h1 className="text-4xl font-bold mb-4">
                BGP Hijacking
            </h1>
            <p className="text-gray-800 leading-relaxed mb-6">
                You may have noticed while learning about BGP that at no point are any of the nodes authenticated. BGP
                does not include any authentication whatsoever and thus it is susceptible to some serious attacks. One
                of these attacks is known as BGP highjacking. BGP highjacking abuses how the protocol works to take over
                routes to certain locations, which could lead to a variety of devastating effects.
            </p>
            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                How does BGP hijacking work?
            </div>
            <p className="text-gray-800 leading-relaxed">
                BGP hijacking abuses the route propagation property of BGP. Because all new routes are propagated
                throughout the entire network and potentially even to neighboring networks being able to get a valid
                route entry into even 1 node could cause network wide or even global scale effects.
            </p>
            <p className="text-gray-800 leading-relaxed mt-1">
                BGP hijacking works like the following:
            </p>
            <p className="text-gray-800 leading-relaxed mt-1">
                First an attacker, sets up a false AS and fills it with a bad route. Then the attacker uses BGP to
                advertise its new bad route to a neighbor AS. The neighbor AS sees the external route come in and
                propagates it to the entire network. From here the attacker has now filled in his new bad route to the
                entire neighboring network. The attacker can chose whatever they want for the bad route, for instance
                they could redirect all traffic to www.youtube.com to some invalid IP address which in turn would cause
                anyone on that network, or any network using that network as transit, to be blocked access to YouTube.

            </p>
            <p className="text-gray-800 leading-relaxed mt-1 mb-6">
                As you can see, BGP hijacking can cause mass outages very easily thanks to route propagation. But what
                if instead of just denying access to a certain site, they redirected that traffic to their own fake
                site? Since the route is decided entirely by the attacker they are free to redirect traffic however they
                please. This means an attacker can change the route to some address to redirect to their own site
                instead and use this to steal information. Since the entire network would now be visiting this new fake
                site, it is very likely a large number of users could fall for this trick and end up giving up their
                personal information directly to the attacker.
            </p>
            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                How does the attacker make sure that their route is chosen?
            </div>
            <p className="text-gray-800 leading-relaxed mb-6">
                If you remember each node has a local version of the route table that it updates based on some policies.
                So how does an attacker get their information into this table for propagation. There are a few ways to
                trigger the update but one way that has a high chance of success is to send a route that is more
                specific than an existing route. Since ASes operate on such a large scale, it is very unlikely they have
                a dedicated route for one specific IP address. Thus an attacker can just send in a very specific route
                and it will almost certainly be chosen when going to that address.
            </p>
            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                Impacts of BGP hijacking
            </div>
            <p className="text-gray-800 leading-relaxed mb-6">
                BGP hijacking can potentially have an impact on a global scale. Since BGP is designed to propagate the
                new route the chain reaction for successfully getting just 1 nodes route table updated can spread even
                globally. Since ASes also communicate and send updated routes to their neighbors, it is possible that
                one bad route can make its way very quickly to a lot of different networks. Unfortunately, the BGP
                standard was not designed with security in mind, and was made in a time where people were more trusting
                on the internet. Since the protocol is fundamentally insecure, other techniques will need to be put in
                place to mitigate this kind of attack.
            </p>

            <div className="flex justify-end mt-10">
                <button
                    onClick={() => {
                        setSelectedIndex(3)
                    }}
                    className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 flex gap-2 transition"
                >
                    Next Section <ArrowRight/>
                </button>
            </div>
        </div>
    );
}
