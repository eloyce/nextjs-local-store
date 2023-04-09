import Image from "next/image";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import DropdownCheckbox from "~/components/DropdownCheckbox";

import { CheckboxType } from "~/types";

import { CATEGORIES_URL } from "~/utils/constants/api";
import { HOME } from "~/utils/constants/routes";

const OPTION_ALL = "all";

const ProductsFilterHeader = ({
  onCategoryFetch,
  totalProducts,
}: {
  onCategoryFetch: (category: string | string[]) => void;
  totalProducts: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<CheckboxType[]>([]);

  const onToggle = (checked: boolean, index: number) => {
    const newOptions = [...categories];
    const indexOfOptionAll = 0;
    newOptions[index].isChecked = checked;

    const isWithoutSelection = newOptions.every((option) => !option.isChecked);
    const isAllSelected = newOptions[index].value === OPTION_ALL && checked;
    const isEverySelectedButAll = newOptions
      .slice(indexOfOptionAll + 1)
      .every((opt) => opt.isChecked);

    setIsDropdownOpen(false);

    if (isAllSelected || isWithoutSelection || isEverySelectedButAll) {
      router.push(HOME, undefined, { scroll: false });

      onCategoryFetch(OPTION_ALL);
      setCategories((prev) =>
        prev.map((entry) => ({
          ...entry,
          isChecked: true,
          disabled: entry.value === OPTION_ALL,
        }))
      );
      return;
    }

    // If "all" was previously selected, deselect it.
    if (newOptions[indexOfOptionAll].isChecked) {
      newOptions[indexOfOptionAll].isChecked = false;
      newOptions[indexOfOptionAll].disabled = false;
    }

    const options = newOptions.reduce((accum: string[], current) => {
      if (current.isChecked) {
        accum.push(current.value);
      }
      return accum;
    }, []);

    onCategoryFetch(options);
    setCategories(newOptions);

    router.push(
      {
        query: { category: options.join(",") },
      },
      undefined,
      { scroll: false }
    );
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORIES_URL);
      const json = (await res.json()) as string[];

      const formattedOptions = json.map((category) => ({
        label: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize
        value: category,
        isChecked: false,
      }));

      setCategories(formattedOptions);
      setCheckboxFromParams(formattedOptions);
    } catch (err) {
      console.error("Unable to get categories:: ", err);
    }
  };

  const selectedOptions = useMemo(() => {
    const isAllSelected = categories.find(
      (c) => c.value === OPTION_ALL && c.isChecked
    );
    if (isAllSelected) {
      return OPTION_ALL;
    }

    const formattedSelection = categories
      .reduce((accum, current) => {
        if (current.isChecked) {
          accum = `${accum}${current.label},`;
        }
        return accum;
      }, "")
      .split(",")
      .join(", ")
      .replace(/,\s*$/, ""); // Remove trailing comma

    return formattedSelection;
  }, [categories]);

  const setCheckboxFromParams = (options: CheckboxType[]) => {
    const params = searchParams.getAll("category").join(",");

    if (params.length) {
      const optionsFromParams = options.map((c) => ({
        label: c.label,
        value: c.value,
        isChecked: params.includes(c.value),
      }));

      setCategories([
        { value: OPTION_ALL, label: "All", isChecked: false },
        ...optionsFromParams,
      ]);
    } else {
      const defaultOptions = options.map((entry) => ({
        ...entry,
        isChecked: true,
      }));

      setCategories([
        { value: OPTION_ALL, label: "All", isChecked: true, disabled: true },
        ...defaultOptions,
      ]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="border-b border-b-slate-400 mx-2 py-4 flex-col flex gap-2 md:flex-row md:justify-between">
      <div className="flex flex-row justify-between items-center relative md:gap-6">
        <h1 className="uppercase tracking-wide text-sm">Our local products</h1>

        <div className="relative">
          <button
            className="text-sm flex flex-row items-center gap-2"
            onClick={() => setIsDropdownOpen((v) => !v)}
            type="button"
          >
            <span className="max-w-[130px] text-ellipsis overflow-hidden whitespace-nowrap md:whitespace-normal sm:max-w-md">
              Filtered by {selectedOptions}
            </span>
            <Image
              src="/down-arrow.svg"
              alt="down arrow"
              width={14}
              height={14}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 top-6 z-10 min-w-[180px]">
              <DropdownCheckbox options={categories} onToggle={onToggle} />
            </div>
          )}
        </div>
      </div>

      <div className="flex-row flex items-center md:border-l-[1px] md:border-l-slate-500 md:pl-5">
        <p className="m-0 text-sm">{totalProducts} Products</p>
      </div>
    </section>
  );
};

export default ProductsFilterHeader;
