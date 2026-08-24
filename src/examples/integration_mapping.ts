interface RawCompanyDetails {
  id: string;
  name: string;
  hqAddress: string;
  customerPhone: string;
  internalEmail: string;
  pubWeb: string;
  xml?: boolean;
  shippingNo: string;
}

interface CompanyDetails {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

class CompanyApiClient {
  public async getCompanyDetails(companyId: string): Promise<CompanyDetails> {
    // Implementation to fetch company details from an API
    const response = await fetch(
      `https://api.example.com/companies/${companyId}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch company details for ID: ${companyId}`);
    }
    const rawData: RawCompanyDetails = await response.json();
    const data: CompanyDetails = {
      id: rawData.id,
      name: rawData.name,
      address: rawData.hqAddress,
      phone: rawData.customerPhone,
      email: rawData.internalEmail,
      website: rawData.pubWeb,
    };
    return data;
  }
}
