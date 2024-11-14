'use client';

import { useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import type { UserDetailForm } from '@/types';

export default function DescriptionEditor() {
    const form = useFormContext<UserDetailForm>();

    return (
        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem className="md:col-span-2">
                    <Label>Description</Label>
                    <FormControl>
                        <ReactQuill
                            modules={{
                                toolbar: [
                                    [
                                        { header: [1, 2, 3, 4, 5, 6, false] },
                                        { font: [] },
                                    ],
                                    [{ size: [] }],
                                    [
                                        'bold',
                                        'italic',
                                        'underline',
                                        'strike',
                                        'blockquote',
                                    ],
                                    [
                                        { list: 'ordered' },
                                        { list: 'bullet' },
                                        { indent: '-1' },
                                        { indent: '+1' },
                                    ],
                                ],
                            }}
                            defaultValue={field.value}
                            onChange={field.onChange}
                        />
                    </FormControl>
                    <FormDescription className="sr-only">
                        Editor for specific doctor information
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
