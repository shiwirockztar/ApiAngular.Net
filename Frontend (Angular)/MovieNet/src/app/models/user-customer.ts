// import { Profile } from "../modelsAdmin/parameter/profile.model";
// import { Customer } from "./customer.model";
// import { PositionComany } from "./parameter/position-company.model";
// import { DocumentType } from "../modelsAdmin/parameter/document-type.model";

export class UserCustomer {
    id: number=0;
    name: string="0";
    lastname: string="0";
    email: string="0";
    phoneNumber: string="0";
    // documentType: DocumentType="0";
    documentType: string="0";
    documentNumber: string="0";
    // customer: Customer;    
    customer: string="0";
    // profile: Profile;    
    profile: string="0";
    password: string="0";
    isPasswordChange: boolean=true;
    // positionCompany: PositionComany;
    positionCompany: string="0";

    constructor(
        id: number=0,
        name: string="0",
        lastname: string="0",
        email: string="0",
        phoneNumber: string="0",
        documentType: string="0",
        documentNumber: string="0",
        customer: string="0",
        profile: string="0",
        password: string="0",
        isPasswordChange: boolean=true,
        positionCompany: string="0"
      ) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.customer = customer;
        this.profile = profile;
        this.password = password;
        this.isPasswordChange = isPasswordChange;
        this.positionCompany = positionCompany;
      }
}