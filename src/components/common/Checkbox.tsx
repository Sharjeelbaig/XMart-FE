interface CheckboxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export default function Checkbox({ onChange, label }: CheckboxProps) {
  return (
    <div className="flex items-center transition hover:scale-[0.99] w-fit">
      <input
        id="link-checkbox"
        type="checkbox"
        onChange={onChange}
        value=""
        className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="link-checkbox"
        className="ms-2 text-sm font-bold text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
}
