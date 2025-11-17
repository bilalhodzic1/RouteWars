import {ArrowRight} from "lucide-react";

export default function HijackingMitigation({setSelectedIndex}) {
    return (
        <div className="max-w-3xl mx-auto py-10 px-6">
            <h1 className="text-4xl font-bold mb-4">
                Mitigating Hijacking
            </h1>
            <p className="text-gray-800 leading-relaxed mb-6">
                We have seen now that BGP highjacks can have some pretty serious effects worldwide. The question becomes
                how do we go about mitigating or preventing BGP hijacking. The truth is BGP hijacking is a very hard
                problem to fix or even detect. Thus, in recent history there has been some significant effort towards
                tools and methodologies that aim to mitigate the effects of BGP highjacking. Most of these efforts boil
                down to two main goals, detecting a hijack and stopping route propagation, and changing practices to
                ensure only safe routes are accepted in the first place.
            </p>
            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                Hijack Detection
            </div>
            <p className="text-gray-800 leading-relaxed mb-6">
                Hijack detection is the idea that we can look at a new BGP message and determine if it is a hijack.
                Unfortunately, there is no perfect mechanism for detecting a hijack but using some previously acquired
                knowledge we can get pretty close. One such mechanism that has been proposed is Resource Public Key
                Infrastructure (RPKI). RPKI is a registry that can be used to validate prefix-to-origin mappings.
                Essentially when a new route comes in for a prefix we can validate that it came from a recognized origin
                before allowing the route to propagate. The problem with this is the ratio of registered prefixes and
                the number of prefixes currently existing is low, so there is a chance some valid routes would not make
                it through via this scheme. This issue is tricky to fix, and often requires manual checking from a
                network admin to verify everything is in order.
            </p>
            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                Safe routing practices
            </div>
            <p className="text-gray-800 leading-relaxed">
                Another initiative that aims to mitigate the effects of BGP highjacking is MANRS. MANRS is a global
                initiative aimed at making internet routing safer for everyone. MANRS seeks to convince people to do a
                little bit extra to try and make the internet safer. Some examples of the things MANRS requests are
            </p>
            <ul className={"list-disc ml-6"}>
                <li>Verify correctness of announcements before propagating</li>
                <li>Enable source address validation within your own infrastructure</li>
                <li>Maintain globally accessible contact information</li>
                <li>Publish route data where anyone can access it for validation and recovery</li>
            </ul>
            <p className={"text-gray-800 leading-relaxed mt-1"}>
                This initiative is targeted at AS managers and seeks to make routing on the internet safer and more
                secure. Although what MANRS proposes would help to make routing safer, not all ASes have adopted MANRS
                so there is still the potential for unsafe routes out on the global internet.
            </p>
            <div className="mt-10 mb-4 text-2xl font-semibold text-gray-800">
                What’s next?
            </div>
            <p className="text-gray-800 leading-relaxed mb-6">
                Although BGP has its problems, the simplicity of its design is what makes global routing possible.
                Because the BGP standard is not designed with authentication included, these other initiatives are the
                only way currently to mitigate this risk. Stopping BGP hijacking is going to take global cooperation and
                will require a bit of effort from all parties involved. As time goes on, the hope is more and more
                people will adopt things like the MANRS initiative, and internet routing will become safer for everyone.
            </p>
        </div>
    );
}
