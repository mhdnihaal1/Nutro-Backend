import Admin from "../../domainLayer/adminDomain";
import Agent from "../../domainLayer/agentDomain";
import Map from "../../domainLayer/mapDomain";
import ClothItem from '../../domainLayer/ClothItemDomain'
import Offer from '../../domainLayer/OfferDomain'


interface AgentRepo {

    findByEmail(email:string): Promise<Agent | null>;

  
}

export default AgentRepo;