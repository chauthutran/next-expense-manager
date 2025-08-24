import { JSONObject, IMessage } from "@/libs/definations";


/** 
 * Relate to URL ( getting parametter from URL, ...)
 *  */ 
export const convertUrlSearchParamToJson = (urlSearchParams: URLSearchParams): JSONObject => {
    const json = {} as JSONObject;
    for (const [key, value] of urlSearchParams) {
      json[key] = value;
    }
    
    return json;
}

export const getErrMessage = (ex: any) => {
    if (ex instanceof Error) {
        return `An error occurred: ${ex.message}`;
    }
    else if (ex.name === 'AbortError') {
        console.error('Fetch request timed out');
    }
    
    return `An unexpected error occurred: ${ex}`;
}

  
export const getContrastColor = (hexColor: string): string => {
    // Convert hex to RGB
    const rgb = parseInt(hexColor.slice(1), 16); 
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;

    // Calculate the brightness (YIQ)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // If the brightness is above the threshold, return black, else return white
    return brightness > 128 ? '#000000' : '#FFFFFF';
}

// Combine class names conditionally
export const cn = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(" ");
}

export const cleanSvg = (svg: string) => {
  return svg
    .replace(/(width|height)="[^"]*"/g, '') // remove width/height
    .replace(/<svg/, '<svg class="w-full h-full"') // enforce sizing
    .replace(/class=/g, 'className=');
}