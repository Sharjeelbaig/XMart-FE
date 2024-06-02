import TextInput from "../common/TextInput";

export default function Searchbar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="m-auto w-full">
      <TextInput
        onChange={onChange}
        label="Search"
        id="search"
        placeholder="Search"
        varient="standard"
      />
    </div>
  );
}
