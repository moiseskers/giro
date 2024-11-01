import {RequestAccessDocumentModel} from "./request-access-out.model";

export class RequestAccessOutModel {
    constructor(
            public email: string,
            public phone: string,
            public organizationBusinessName: string,
            public organizationTradeName: string,
            public organizationTaxIdentificationNumber: string,
            public organizationAddress: string,
            public legalRepresentativeName: string,
            public legalRepresentativeTaxIdentificationNumber: string,
            public legalRepresentativeNationality: string,
            public managerName: string,
            public documents?: RequestAccessDocumentModel[],
    ) {
    }
}


