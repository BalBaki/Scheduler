import languages from '@/languages.json';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { UserDetailForm } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FaCheck } from 'react-icons/fa';

export default function Languages() {
    const form = useFormContext<UserDetailForm>();

    return (
        <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-base">Languages: </FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        'w-[200px] justify-between',
                                        !field.value && 'text-muted-foreground'
                                    )}
                                >
                                    Select language
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0" side="bottom">
                            <Command>
                                <CommandInput placeholder="Search language..." className="h-9" />
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
                                                        field.value?.includes(code)
                                                            ? field.value.filter((value) => value !== code)
                                                            : [...(field.value || []), code],
                                                        { shouldDirty: true }
                                                    );
                                                }}
                                            >
                                                <div className="text-sm font-normal flex items-center w-full">
                                                    {name}
                                                    {field.value?.some((value) => value === code) && (
                                                        <FaCheck className={'ml-auto h-4 w-4'} />
                                                    )}
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandList>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
