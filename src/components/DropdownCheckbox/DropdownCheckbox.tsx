import { CheckboxType } from "~/types";

const DropdownCheckbox = ({
  options,
  onToggle,
}: {
  options: CheckboxType[];
  onToggle: (v: boolean, index: number) => void;
}) => {
  return (
    <div className="bg-white p-4 rounded-b-lg shadow-xl flex flex-col gap-1">
      {options.map((option, index) => (
        <label key={option.value} className="flex flex-row items-center gap-2">
          <input
            className="accent-[#46237A]"
            checked={option.isChecked}
            onChange={(e) => onToggle(e.target.checked, index)}
            value={option.value}
            disabled={option.disabled}
            type="checkbox"
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default DropdownCheckbox;
