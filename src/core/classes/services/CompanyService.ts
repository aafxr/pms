import {fetchCompanyByINN} from "../../../api/fetchCompanyByINN";

export class CompanyService{

    static async getByInn(inn: string){
        if(!/\d{10}/.test(inn)) return
        const company = await fetchCompanyByINN(inn)

        return company.suggestions[0]
    }
}