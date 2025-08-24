import { ICategory } from '@/libs/definations';
import { cleanSvg } from '@/utils';

export default function CategoryItem({ data }: { data: ICategory }) {
    const sanitizedIcon = cleanSvg(data.icon);

    return (
        <div className="flex flex-col items-center justify-center w-full space-y-2">
            <div
                className="w-6 h-6 [&_svg]:!w-full [&_svg]:!h-full [&_svg]:block"
                dangerouslySetInnerHTML={{ __html: sanitizedIcon }}
            />
            <div className="text-sm font-semibold text-gray-700 text-center">
                {data.name}
            </div>
        </div>
    );
}
