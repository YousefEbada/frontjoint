import FeatureCard from "@/components/molecules/FeatureCardCom";

const ChooseUs = () => {
    const cards = [
        {
            title: "HOLIDAY HOURS UPDATE",
            desc: "Our clinic will be closed on Friday, Sept 25, for maintenance. Online services remain available.",
        },
        {
            title: "NEW SPECIALIST JOINS OUR TEAM",
            desc: "Welcome Dr. Hany, our new physiotherapy expert specializing in sports injury recovery.",
        },
        {
            title: "YOUR RECOVERY UPDATES",
            desc: "Learn about new features added to improve your recovery tracking.",
        },
        {
            title: "Effortless Recovery",
            desc: "Book physiotherapy sessions, access your medical reports, and follow your personalized exercise plan – all in one secure platform."
        }
    ];
    return (
        <>
            <h2 className={`text-[40px] md:text-[64px] font-bold font-['IBM_Plex_Sans'] text-[#fff]`} >
                Why Choose Us?
            </h2>
            <div className="cards mx-auto grid grid-cols-2 md:grid-cols-4">
                {cards.map((card, index) => {
                    return <FeatureCard key={index} title={card.title} description={card.desc} />
                })}
            </div>
        </>
    )
}

export default ChooseUs
