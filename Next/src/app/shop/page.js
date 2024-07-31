import FilterMenu from "../../components/Shop Page/FilterMenu"
import SchoolLanding from "../../components/Shop Page/ShopLanding"
import BerkeleyBackground from "../../../public/images/berkbackground.png";

export default function Shop() {

    const schoolData = {
        "UCB": {
            name: "UC BERKELEY",
            location: "BERKELEY, CALIFORNIA",
            description: "Nestled between the Bay and the lush groves of the Berkeley Hills, the University of California, Berkeley is the founding campus of the University of California system. Named #1 Public University nation-wide, UC Berkeley is a hotbed for student life, education, and more! Check out wares from your fellow Bears and make a few listings of your own.",
            image: BerkeleyBackground,
            low_image: "/images/berkbackground_lo.png"
        }
    };

    
    return (
        <div >
            <SchoolLanding school = {schoolData["UCB"]}></SchoolLanding>
            <FilterMenu></FilterMenu>
        </div>
    )
}