import Admin from "../../domainLayer/adminDomain";
import Agent from "../../domainLayer/agentDomain";
import Map from "../../domainLayer/mapDomain";
import ClothItem from '../../domainLayer/ClothItemDomain'
import Offer from '../../domainLayer/OfferDomain'
import User from '../../domainLayer/userDomain'


interface AdminRepo {

    AddAdmin(user:Admin):Promise<Admin>;
    AddAgent(agent:Agent):Promise<Agent>;
    getAgents(agent:Agent):Promise<Agent>;
    AddMap(map:Map):Promise<Map>;
    AddClothItem(clothitem:ClothItem):Promise<ClothItem >
    getItems(clothitem:ClothItem):Promise<ClothItem >
    getOffers(offer:Offer):Promise<Offer >
    AddOffer(offer:Offer):Promise<Offer >
    findByEmail(email:string): Promise<Admin | null>;
    findById(_id:string): Promise<Admin | null>
  
}

export default AdminRepo;