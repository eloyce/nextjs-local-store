import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import DropdownCheckbox from "~/components/DropdownCheckbox";
import ProductTile from "~/components/ProductTile";

import { Product } from "~/types";
import { CATEGORY_URL, CATEGORIES_URL } from "~/utils/constants/api";

const ProductsGridHeader = ({
  onCategoryEnable,
  onCategoryDisable,
  totalProducts,
}: {
  onCategoryEnable: (category: string) => void;
  onCategoryDisable: (category: string) => void;
  totalProducts: number;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<
    { label: string; value: string; isChecked: boolean }[]
  >([]);

  const onToggle = (checked: boolean, index: number) => {
    // TODO: fix toggle and add URL params
    const newOptions = [...categories];

    // setIsDropdownOpen(false);

    if (newOptions[index].value === "all" && checked) {
      onCategoryEnable(newOptions[index].value);
      setCategories((prev) =>
        prev.map((entry) => ({ ...entry, isChecked: entry.value === "all" }))
      );
      return;
    }

    if (checked) {
      onCategoryEnable(newOptions[index].value);
    } else {
      onCategoryDisable(newOptions[index].value);
    }

    newOptions[index].isChecked = checked;
    setCategories(newOptions);
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

      setCategories([
        { value: "all", label: "All", isChecked: true },
        ...formattedOptions,
      ]);
    } catch (err) {
      console.error("Unable to get categories:: ", err);
    }
  };

  const selectedOptions = useMemo(() => {
    return categories.reduce((accum, current) => {
      if (current.isChecked) {
        accum = `${accum} ${current.label}`.trim();
      }
      return accum;
    }, "");
  }, [categories]);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  return (
    <section className="pb-2 border-b border-b-slate-400 mx-2 py-6 flex-col flex gap-2">
      <div className="flex flex-row justify-between items-center relative">
        <h1 className="uppercase tracking-wide text-sm">Our local products</h1>

        <button
          className="text-sm flex flex-row items-center gap-2"
          onClick={() => setIsDropdownOpen((v) => !v)}
          type="button"
        >
          <span>Filtered by {selectedOptions}</span>
          <Image
            src="/down-arrow.svg"
            alt="down arrow"
            width={14}
            height={14}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-6 right-0 z-10">
            <DropdownCheckbox options={categories} onToggle={onToggle} />
          </div>
        )}
      </div>

      <div className="flex-row flex items-center md:border-l-2 md:border-l-slate-400 md:pl-4">
        <p className="m-0">{totalProducts} Products</p>
      </div>
    </section>
  );
};

const ProductGrid = ({ initialProducts }: { initialProducts: Product[] }) => {
  const [products, setProducts] = useState(initialProducts);

  const onCategoryEnable = async (category: string) => {
    try {
      const url = `${CATEGORY_URL}${category}`;
      const response = await fetch(url);
      const data = await response.json();

      setProducts((prev) => [...prev, ...data]);
    } catch (err) {
      console.error(err);
    }
  };

  const onCategoryDisable = (category: string) => {
    const filteredResults = products.filter(
      (product) => product.category !== category
    );

    setProducts(filteredResults);
  };

  return (
    <>
      <ProductsGridHeader
        onCategoryDisable={onCategoryDisable}
        onCategoryEnable={onCategoryEnable}
        totalProducts={products.length}
      />

      <section className="p-6 gap-6 grid-cols-1 grid md:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </section>
    </>
  );
};

export default ProductGrid;
