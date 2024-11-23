'use client';

import 'react-image-crop/dist/ReactCrop.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import type { Dispatch, SetStateAction } from 'react';
import type { Crop, PixelCrop } from 'react-image-crop';

type ImageCropProps = {
    imageUrl: string;
    setCroppedImage: Dispatch<SetStateAction<File | null>>;
    disabled?: boolean;
};

export default function ImageCrop({
    imageUrl,
    setCroppedImage,
    disabled,
}: ImageCropProps) {
    const [crop, setCrop] = useState<Crop>();
    const [isShowDialog, setIsShowDialog] = useState(!!imageUrl);
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        imageUrl && setIsShowDialog(true);
    }, [imageUrl]);

    const centerAspectCrop = (
        mediaWidth: number,
        mediaHeight: number,
        aspect: number,
    ) =>
        centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        );

    const handleCropClick = async () => {
        if (!imageRef.current || !completedCrop) return;

        const { naturalWidth, naturalHeight, width, height } = imageRef.current;
        const scaleX = naturalWidth / width;
        const scaleY = naturalHeight / height;
        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
        );
        const ctx = offscreen.getContext('2d');

        if (!ctx) return;

        ctx.translate(-completedCrop.x * scaleX, -completedCrop.y * scaleY);
        ctx.drawImage(
            imageRef.current,
            0,
            0,
            naturalWidth,
            naturalHeight,
            0,
            0,
            naturalWidth,
            naturalHeight,
        );

        const blob = await offscreen.convertToBlob({
            type: 'image/png',
        });
        const file = new File([blob], 'croppedImage.png', {
            type: 'image/png',
        });

        file && setCroppedImage(file);
        setIsShowDialog(false);
    };
    const handleImageLoad = (
        event: React.SyntheticEvent<HTMLImageElement, Event>,
    ) => {
        const { width, height } = event.currentTarget;

        setCrop(centerAspectCrop(width, height, 1));
    };

    return (
        <Dialog open={isShowDialog} onOpenChange={setIsShowDialog}>
            <DialogTrigger asChild>
                <Button
                    className="text-center"
                    disabled={disabled}
                    aria-label="Open crop pop-up"
                >
                    Crop
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crop Image</DialogTitle>
                    <DialogDescription asChild className="text-center">
                        <div>
                            <ReactCrop
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                circularCrop={true}
                                locked={true}
                                onComplete={(c) => setCompletedCrop(c)}
                            >
                                <div className="relative flex justify-center">
                                    <Image
                                        ref={imageRef}
                                        src={imageUrl}
                                        alt="Crop Picture"
                                        className="h-auto w-60 object-contain"
                                        width="0"
                                        height="0"
                                        priority={true}
                                        onLoad={handleImageLoad}
                                    />
                                </div>
                            </ReactCrop>
                            <div>
                                <Button
                                    aria-label="Complete the cropping"
                                    onClick={handleCropClick}
                                >
                                    Crop
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
