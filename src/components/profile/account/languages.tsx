import { useFormContext } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import languages from '@/languages.json';
import { cn } from '@/lib/utils';
import type { UserDetailForm } from '@/types';

export default function Languages() {
    const form = useFormContext<UserDetailForm>();

    return (
        <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Languages</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        'justify-between',
                                        !field.value && 'text-muted-foreground',
                                    )}
                                >
                                    Select language
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" side="bottom">
                            <Command>
                                <CommandInput
                                    placeholder="Search language..."
                                    className="h-9"
                                />
                                <CommandEmpty>No language found.</CommandEmpty>
                                <CommandGroup>
                                    <CommandList>
                                        {languages.map(({ code, name }) => (
                                            <CommandItem
                                                key={code}
                                                value={name}
                                                onSelect={() => {
                                                    form.setValue(
                                                        'languages',
                                                        field.value?.includes(
                                                            code,
                                                        )
                                                            ? field.value.filter(
                                                                  (value) =>
                                                                      value !==
                                                                      code,
                                                              )
                                                            : [
                                                                  ...(field.value ||
                                                                      []),
                                                                  code,
                                                              ],
                                                        { shouldDirty: true },
                                                    );
                                                }}
                                            >
                                                <div className="flex w-full items-center text-sm font-normal">
                                                    {name}
                                                    {field.value?.some(
                                                        (value) =>
                                                            value === code,
                                                    ) && (
                                                        <FaCheck
                                                            className={
                                                                'ml-auto h-4 w-4'
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandList>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
