import CertifyStore from "./Certify";
import ClassStore from "./Class";
import MeStore from "./Me";

export default class RootStore {
    CertifyStore;
    ClassStore;
    MeStore;

    constructor(){
        this.CertifyStore = new CertifyStore(this);
        this.ClassStore = new ClassStore(this);
        this.MeStore = new MeStore(this);
    }
}

// const stores = {
//     CertifyStore: new CertifyStore(),
//     ClassStore: new ClassStore(),
// };

// export default stores;