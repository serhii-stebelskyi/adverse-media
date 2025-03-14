import { useState, useEffect, Fragment } from "react";
import s from "./SearchPage.module.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import Button from "components/Button/Button";
import MostSearchedCompanies from "./components/MostSearchedCompanies/MostSearchedCompanies";
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";
import classNames from "classnames";
import axios from "helpers/axios";
import { ReactComponent as Download } from "icons/download.svg";
import Popup from "components/Popup/Popup";
import mime from "mime-types";
import DownloadVariants from "./components/DownloadVariants/DownloadVariants";
import {
  splitFileName,
  downloadCSVFile,
  arrayToExcel,
  arrayToCsv,
} from "./helpers/functions";
import { ReactComponent as Back } from "icons/back.svg";
import Loader from "components/Loader/Loader";
import { paths } from "routes/paths";
import { useHistory } from "react-router";

const SearchPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [mostSearchedCompanies, setMostSearchedCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [mostSearchedCompaniesLoading, setMostSearchedCompaniesLoading] =
    useState(true);
  const [companiesLookup, setCompaniesLookup] = useState(null);
  const [message, setMessage] = useState(null);
  const [visibleDownloadPopup, setVisibleDownloadPopup] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.get("/most-searches").then((res) => {
      if (Array.isArray(res?.data)) {
        setMostSearchedCompanies(res.data);
        setMostSearchedCompaniesLoading(false);
      }
    });
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    const xlsxType = mime.lookup("xlsx");
    const csvType = mime.lookup("csv");
    if (file && (xlsxType === file.type || csvType === file.type)) {
      setUploadedFile(file);
      let formData = new FormData();
      formData.append("companies", file);
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (typeof result?.count === "number") {
        setMessage(
          `File uploaded successfully. ${result.count} companies were added.`
        );
      } else {
        setMessage("Something went wrong. Please, try later.");
      }
    } else {
      setMessage("The type of the file is not supported");
    }
  };

  const handleSelectCompany = (company) => {
    if (!currentCompany || company.id !== currentCompany.id) {
      setCurrentCompany(company);
      setSelectedMediaIndex(0);
      setIframeLoading(true);
    }
  };

  const handleDownload = async (type) => {
    if (type === "csv") {
      if (companiesLookup) {
        const data = arrayToCsv(companiesLookup);
        downloadCSVFile(data, "companies");
        setVisibleDownloadPopup(false);
      } else {
        axios.get("/companies").then((res) => {
          const companies = res.data;
          const data = arrayToCsv(companies);
          downloadCSVFile(data, "companies");
          setCompaniesLookup(companies);
          setVisibleDownloadPopup(false);
        });
      }
    } else {
      if (companiesLookup) {
        arrayToExcel(companiesLookup, "companies");
        setVisibleDownloadPopup(false);
      } else {
        axios.get("/companies").then((res) => {
          const companies = res.data;
          arrayToExcel(companies, "companies");
          setCompaniesLookup(companies);
          setVisibleDownloadPopup(false);
        });
      }
    }
  };
  const handleSelectMedia = (index) => {
    if (selectedMediaIndex !== index) {
      setSelectedMediaIndex(index);
      setIframeLoading(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    history.push(paths.login);
  };
  return (
    <main className={s.searchPage}>
      <div className={s.mainCol}>
        <div className={s.topBar}>
          <div className={s.searchBarWrap}>
            <SearchBar
              handleSelect={handleSelectCompany}
              currentCompany={currentCompany}
            />
          </div>
          <div className={s.uploadWrap}>
            <div className={s.inlineWrap}>
              <Button className={s.uploadBtn}>Upload file</Button>
              <input
                onChange={handleUpload}
                type="file"
                className={s.hiddenField}
              />
            </div>
            {uploadedFile && (
              <div className={s.filenameWrap}>
                <div className={s.filename}>
                  <span className={s.name}>
                    {splitFileName(uploadedFile.name).name}
                  </span>
                  <span className={s.type}>
                    {splitFileName(uploadedFile.name).type}
                  </span>
                </div>
              </div>
            )}
          </div>
          <Button
            className={s.downloadBtn}
            onClick={() => setVisibleDownloadPopup(true)}
          >
            <Download className={s.icon} />
          </Button>
        </div>
        <div
          className={classNames(s.content, {
            [s.uploadedFile]: uploadedFile,
          })}
        >
          {currentCompany ? (
            <CompanyDetails
              data={currentCompany}
              handleGoBack={() => setCurrentCompany(null)}
              handleChangeLink={handleSelectMedia}
            />
          ) : (
            <MostSearchedCompanies
              data={mostSearchedCompanies}
              loading={mostSearchedCompaniesLoading}
              handleSelect={handleSelectCompany}
            />
          )}
        </div>
      </div>
      <div
        className={classNames(s.asideCol, {
          [s.current]: currentCompany && currentCompany.media?.length > 0,
        })}
      >
        {!currentCompany && (
          <Button className={s.signOut} onClick={handleSignOut}>
            Sign out
          </Button>
        )}
        {Boolean(currentCompany) &&
          Boolean(currentCompany.media?.[selectedMediaIndex]) && (
            <Fragment>
              <a
                className={s.goToSiteLink}
                href={currentCompany.media[selectedMediaIndex]?.url}
                target="_blank"
                rel="noreferrer"
              >
                <Button className={s.goToSiteBtn}>
                  <Back />
                </Button>
              </a>
              <div className={s.iframeWrap}>
                <iframe
                  className={s.iframe}
                  name="link-preview"
                  id="link-preview"
                  src={currentCompany.media[selectedMediaIndex]?.url}
                  title={currentCompany.media[selectedMediaIndex]?.title}
                  onLoad={() => {
                    setIframeLoading(false);
                  }}
                ></iframe>
                {iframeLoading && (
                  <div className={s.loading}>
                    <Loader />
                  </div>
                )}
              </div>
            </Fragment>
          )}
      </div>
      {message && (
        <Popup message={message} handleClose={() => setMessage(null)} />
      )}
      {visibleDownloadPopup && (
        <Popup handleClose={() => setVisibleDownloadPopup(false)}>
          <DownloadVariants handleSelect={handleDownload} />
        </Popup>
      )}
    </main>
  );
};

export default SearchPage;
