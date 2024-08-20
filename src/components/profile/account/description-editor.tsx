import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    Autoformat,
    BlockQuote,
    Bold,
    ClassicEditor,
    Essentials,
    FontSize,
    Indent,
    IndentBlock,
    Italic,
    List,
    Mention,
    Paragraph,
    PasteFromOffice,
    PictureEditing,
    TextTransformation,
    Underline,
} from 'ckeditor5';
import { useFormContext } from 'react-hook-form';
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
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                toolbar: {
                                    items: [
                                        'undo',
                                        'redo',
                                        '|',
                                        'fontSize',
                                        'bold',
                                        'italic',
                                        'underline',
                                        '|',
                                        'blockQuote',
                                        '|',
                                        'bulletedList',
                                        'numberedList',
                                        '|',
                                        'outdent',
                                        'indent',
                                    ],
                                },
                                plugins: [
                                    Autoformat,
                                    BlockQuote,
                                    Bold,
                                    FontSize,
                                    Essentials,
                                    Indent,
                                    IndentBlock,
                                    Italic,
                                    List,
                                    Mention,
                                    Paragraph,
                                    PasteFromOffice,
                                    PictureEditing,
                                    TextTransformation,
                                    Underline,
                                ],
                            }}
                            onChange={(_, editor) =>
                                field.onChange(editor.getData())
                            }
                            data={field.value}
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
