import { Control, FieldValues, Path } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type CustomFormFieldProps<T extends FieldValues> = {
  name: Path<T>; // Use Path<T> for the name type
  control: Control<T>;
};

export const CustomFormField = <T extends FieldValues>({ name, control }: CustomFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name} // No need to cast
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export type CustomFormSelectProps<T extends FieldValues> = CustomFormFieldProps<T> & {
  items: string[];
  labelText?: string;
};

export const CustomFormSelect = <T extends FieldValues>({
  name,
  control,
  items,
  labelText,
}: CustomFormSelectProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText || name}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
