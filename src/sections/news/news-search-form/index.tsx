"use client";

import React, { useCallback, useState } from "react";

import styles from "./styles.module.scss";
import { SelectBox, Input } from "@/components";
import Datepicker from "react-tailwindcss-datepicker";
import { debounce } from "lodash";

const CountryIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.33333 7.33333L11.6667 10.6667L10.6667 11.6667L7.33333 8.33333V7.80667L7.15333 7.62C6.36938 8.29597 5.36847 8.66746 4.33333 8.66667C3.18406 8.66667 2.08186 8.21012 1.2692 7.39746C0.456546 6.58481 0 5.4826 0 4.33333C0 3.18406 0.456546 2.08186 1.2692 1.2692C2.08186 0.456546 3.18406 0 4.33333 0C5.4826 0 6.58481 0.456546 7.39746 1.2692C8.21012 2.08186 8.66667 3.18406 8.66667 4.33333C8.66667 5.40667 8.27333 6.39333 7.62 7.15333L7.80667 7.33333H8.33333ZM4.33333 1L3.96667 1.02C3.80667 1.36667 3.56 1.95333 3.38 2.66667H5.28667C5.10667 1.95333 4.86 1.36667 4.7 1.02C4.58 1 4.46 1 4.33333 1ZM7.22 2.66667C6.82368 1.97295 6.18869 1.44695 5.43333 1.18667C5.59333 1.54 5.8 2.05333 5.95333 2.66667H7.22ZM1.44667 2.66667H2.71333C2.86667 2.05333 3.07333 1.54 3.23333 1.18667C2.47797 1.44695 1.84299 1.97295 1.44667 2.66667ZM1 4.33333C1 4.66667 1.05333 5.02 1.15333 5.33333H2.58L2.5 4.33333L2.58 3.33333H1.15333C1.05333 3.64667 1 4 1 4.33333ZM7.51333 5.33333C7.61333 5.02 7.66667 4.66667 7.66667 4.33333C7.66667 4 7.61333 3.64667 7.51333 3.33333H6.08667C6.19259 3.99579 6.19259 4.67087 6.08667 5.33333H7.51333ZM3.24667 3.33333L3.16667 4.33333L3.24667 5.33333H5.42C5.52593 4.67087 5.52593 3.99579 5.42 3.33333H3.24667ZM4.33333 7.66667C4.45333 7.66667 4.57333 7.66667 4.68667 7.64667C4.85333 7.3 5.10667 6.71333 5.28667 6H3.38C3.56 6.71333 3.81333 7.3 3.98 7.64667L4.33333 7.66667ZM7.22 6H5.95333C5.8 6.61333 5.59333 7.12667 5.43333 7.48C6.18869 7.21972 6.82368 6.69372 7.22 6ZM1.44667 6C1.84299 6.69372 2.47797 7.21972 3.23333 7.48C3.07333 7.12667 2.86667 6.61333 2.71333 6H1.44667Z"
      fill="#9CA3AF"
    />
  </svg>
);

const IndustryIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 10H10.6667V11.3333H12M12 7.33333H10.6667V8.66667H12M13.3333 12.6667H7.99999V11.3333H9.33333V10H7.99999V8.66667H9.33333V7.33333H7.99999V6H13.3333M6.66666 4.66667H5.33333V3.33333H6.66666M6.66666 7.33333H5.33333V6H6.66666M6.66666 10H5.33333V8.66667H6.66666M6.66666 12.6667H5.33333V11.3333H6.66666M3.99999 4.66667H2.66666V3.33333H3.99999M3.99999 7.33333H2.66666V6H3.99999M3.99999 10H2.66666V8.66667H3.99999M3.99999 12.6667H2.66666V11.3333H3.99999M7.99999 4.66667V2H1.33333V14H14.6667V4.66667H7.99999Z"
      fill="#9CA3AF"
    />
  </svg>
);

const TimeIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.66667 8.00004H6V9.33337H4.66667V8.00004ZM14 4.00004V13.3334C14 14.0734 13.4067 14.6667 12.6667 14.6667H3.33333C2.97971 14.6667 2.64057 14.5262 2.39052 14.2762C2.14048 14.0261 2 13.687 2 13.3334V4.00004C2 3.26671 2.6 2.66671 3.33333 2.66671H4V1.33337H5.33333V2.66671H10.6667V1.33337H12V2.66671H12.6667C13.0203 2.66671 13.3594 2.80718 13.6095 3.05723C13.8595 3.30728 14 3.64642 14 4.00004ZM3.33333 5.33337H12.6667V4.00004H3.33333V5.33337ZM12.6667 13.3334V6.66671H3.33333V13.3334H12.6667ZM10 9.33337V8.00004H11.3333V9.33337H10ZM7.33333 9.33337V8.00004H8.66667V9.33337H7.33333ZM4.66667 10.6667H6V12H4.66667V10.6667ZM10 12V10.6667H11.3333V12H10ZM7.33333 12V10.6667H8.66667V12H7.33333Z"
      fill="#9CA3AF"
    />
  </svg>
);

const SearchKeywordIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.91667 2.5C9.35326 2.5 10.731 3.07068 11.7468 4.0865C12.7627 5.10233 13.3333 6.48008 13.3333 7.91667C13.3333 9.25833 12.8417 10.4917 12.0333 11.4417L12.2583 11.6667H12.9167L17.0833 15.8333L15.8333 17.0833L11.6667 12.9167V12.2583L11.4417 12.0333C10.4586 12.8721 9.20887 13.333 7.91667 13.3333C6.48008 13.3333 5.10233 12.7627 4.0865 11.7468C3.07068 10.731 2.5 9.35326 2.5 7.91667C2.5 6.48008 3.07068 5.10233 4.0865 4.0865C5.10233 3.07068 6.48008 2.5 7.91667 2.5ZM7.91667 4.16667C5.83333 4.16667 4.16667 5.83333 4.16667 7.91667C4.16667 10 5.83333 11.6667 7.91667 11.6667C10 11.6667 11.6667 10 11.6667 7.91667C11.6667 5.83333 10 4.16667 7.91667 4.16667Z"
      fill="#045DE3"
    />
  </svg>
);

export const NewsSearchForm: React.FC<any> = ({ listCountry, listIndustry, handleFetch }) => {
  const [countries, setCountries] = useState<any>(undefined);
  const [industries, setIndustries] = useState<any>(undefined);
  const [times, setTimes] = useState<any>(undefined);
  const [corporateName, setCorporateName] = useState<any>(undefined);

  const handleChange = (key: string, value: any) => {
    const params: any = {countries, industries, times, corporateName};
    params[key] = value;
    switch(key) {
      case 'countries':
        setCountries(value);
        break;
      case 'industries':
        setIndustries(value);
      case 'times':
        setTimes(value);
        break;
      case 'corporateName':
        setCorporateName(value);
        break;
      default:
        break;
    }
    notifyChange(params);
  };

  const notifyChange =  useCallback(
    debounce((params: any) => {
      if (handleFetch) handleFetch(params);
    }, 300),
  []);

  return (
    <section className={styles.section}>
      <form className={styles.form}>
        <div className={styles.searchForm}>
          <div className={styles.searchCountry}>
            <label className={styles.formLabel}>Filter: </label>
            <SelectBox
              multiple
              disabled={false}
              handleChange={(value) => handleChange("countries", value)}
              svgIcon={<CountryIcon />}
              label="Incidents by Country"
              id="countries"
              options={listCountry || []}
              className={styles.searchSelect}
              value={countries}
            />
          </div>
          <div className={styles.searchIndustry}>
            <label className={styles.formLabel}>&nbsp;</label>
            <SelectBox
              disabled={false}
              multiple
              id="industries"
              handleChange={(value) => handleChange("industries", value)}
              svgIcon={<IndustryIcon />}
              label="Incidents by Industry"
              options={listIndustry}
              className={styles.searchSelect}
              value={industries}
            />
          </div>
          <div className={styles.searchTime}>
            <label className={styles.formLabel}>&nbsp;</label>
            <div className={styles.searchDate}>
              <div className={styles.searchDateIcon}>
                <TimeIcon />
              </div>
              <div className={styles.searchDatePicker}>
                <Datepicker
                  primaryColor={"cyan"}
                  toggleIcon={() => null}
                  useRange={false}
                  value={times || null}
                  onChange={(newValue) => handleChange("times", newValue)}
                  placeholder="Incidents by Timeframe"
                  inputClassName="min-h-[45px] rounded-3xl w-full max-md:w-full outline-none text-[14px] pl-2 line-clamp-1 placeholder:text-[#172937] placeholder:line-clamp-1 placeholder:text-[14px]"
                  containerClassName="bg-transparent text-black relative rounded-3xl]"
                  toggleClassName="absolute bg-white-300 rounded-r-lg text-black -right-3 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className={styles.searchKeyword}>
            <label className={styles.formLabel}>Search:</label>
            <div className={styles.searchInput}>
              <Input
                svgIcon={<SearchKeywordIcon />}
                placeholder="Enter a keyword ..."
                value={corporateName || ""}
                onChange={(event) => handleChange("corporateName", event.target.value)}
                className={styles.searchInputElem}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
