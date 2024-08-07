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
import type { UserDetailForm } from '@/types';

export default function DescriptionEditor() {
    const { getValues, setValue } = useFormContext<UserDetailForm>();

    return (
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
            onChange={(event, editor) =>
                setValue('description', editor.getData(), {
                    shouldDirty: true,
                })
            }
            data={getValues('description')}
        />
    );
}
