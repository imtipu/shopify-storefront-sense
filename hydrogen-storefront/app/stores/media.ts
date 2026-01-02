import { create } from "zustand";

interface ImageZoomState {
    isZoomed: boolean;
    setIsZoomed: (isZoomed: boolean) => void;
    id?: string;
    setId: (id: string) => void;
    src?: string;
    setSrc: (src: string) => void;
    altText?: string;
    setAltText: (altText: string) => void;
    width?: number;
    setWidth: (width: number) => void;
    height?: number;
    setHeight: (height: number) => void;
}

export const useImageZoom = create<ImageZoomState>((set) => ({
    isZoomed: false,
    setIsZoomed: (isZoomed) => set({isZoomed}),
    id: undefined,
    setId: (id) => set({id}),
    src: undefined,
    setSrc: (src) => set({src}),
    altText: undefined,
    setAltText: (altText) => set({altText}),
    width: undefined,
    setWidth: (width) => set({width}),
    height: undefined,
    setHeight: (height) => set({height}),
}));
