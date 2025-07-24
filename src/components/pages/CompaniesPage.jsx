import React, { useEffect, useState } from "react";
import CompanyList from "@/components/organisms/CompanyList";
import CompanyForm from "@/components/organisms/CompanyForm";
import CompanyDetail from "@/components/organisms/CompanyDetail";
import { companyService } from "@/services/api/companyService";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";

const CompaniesPage = ({ onMenuClick }) => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCompanies(companies);
    } else {
const filtered = companies.filter(company =>
        company.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry_c?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email_c?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [companies, searchTerm]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = async (companyData) => {
    try {
      const newCompany = await companyService.create(companyData);
      setCompanies(prev => [newCompany, ...prev]);
      setShowForm(false);
      setEditingCompany(null);
      toast.success("Company added successfully!");
    } catch (err) {
      toast.error("Failed to add company");
      throw err;
    }
  };

  const handleEditCompany = async (companyData) => {
    try {
      const updatedCompany = await companyService.update(editingCompany.Id, companyData);
      setCompanies(prev => prev.map(company => 
        company.Id === editingCompany.Id ? updatedCompany : company
      ));
      setShowForm(false);
      setEditingCompany(null);
      setSelectedCompany(updatedCompany);
      toast.success("Company updated successfully!");
    } catch (err) {
      toast.error("Failed to update company");
      throw err;
    }
  };

  const handleDeleteCompany = async (companyId) => {
    try {
      await companyService.delete(companyId);
      setCompanies(prev => prev.filter(company => company.Id !== companyId));
      toast.success("Company deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete company");
    }
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setShowDetail(true);
  };

  const handleEditClick = (company) => {
    setEditingCompany(company);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCompany(null);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedCompany(null);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <Header
          title="Companies"
          onMenuClick={onMenuClick}
        />
        <div className="flex-1 p-6">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <Header
          title="Companies"
          onMenuClick={onMenuClick}
        />
        <div className="flex-1 p-6">
          <Error 
            message={error}
            onRetry={loadCompanies}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <Header
        title="Companies"
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        onMenuClick={onMenuClick}
        onAddClick={() => setShowForm(true)}
        addButtonText="Add Company"
        searchPlaceholder="Search companies..."
      />
      
      <div className="flex-1 p-6 overflow-y-auto">
        {filteredCompanies.length === 0 ? (
          <Empty
            title={searchTerm ? "No companies found" : "No companies yet"}
            message={searchTerm ? `No companies match "${searchTerm}"` : "Get started by adding your first company"}
            actionText="Add Company"
            onAction={() => setShowForm(true)}
            icon="Building2"
          />
        ) : (
          <CompanyList
            companies={filteredCompanies}
            onCompanyClick={handleCompanyClick}
            onEditCompany={handleEditClick}
            onDeleteCompany={handleDeleteCompany}
          />
        )}
      </div>

      {showForm && (
        <CompanyForm
          company={editingCompany}
          onSubmit={editingCompany ? handleEditCompany : handleAddCompany}
          onCancel={closeForm}
          isEditing={!!editingCompany}
        />
      )}

      {showDetail && selectedCompany && (
        <CompanyDetail
          company={selectedCompany}
          onClose={closeDetail}
          onEdit={handleEditClick}
          onDelete={handleDeleteCompany}
        />
      )}
    </div>
  );
};

export default CompaniesPage;