import companiesData from '@/services/mockData/companies.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CompanyService {
  constructor() {
    this.companies = [...companiesData];
  }

  async getAll() {
    await delay(300);
    return [...this.companies].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    await delay(200);
    const company = this.companies.find(company => company.Id === parseInt(id));
    if (!company) {
      throw new Error("Company not found");
    }
    return { ...company };
  }

  async create(companyData) {
    await delay(400);
    
    const maxId = this.companies.reduce((max, company) => 
      company.Id > max ? company.Id : max, 0
    );
    
    const newCompany = {
      Id: maxId + 1,
      ...companyData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.companies.push(newCompany);
    return { ...newCompany };
  }

  async update(id, companyData) {
    await delay(350);
    
    const index = this.companies.findIndex(company => company.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Company not found");
    }
    
    const updatedCompany = {
      ...this.companies[index],
      ...companyData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    this.companies[index] = updatedCompany;
    return { ...updatedCompany };
  }

  async delete(id) {
    await delay(250);
    
    const index = this.companies.findIndex(company => company.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Company not found");
    }
    
    this.companies.splice(index, 1);
    return true;
  }
}

export const companyService = new CompanyService();