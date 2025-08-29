import { ICategory } from '@/libs/definations';
import { cleanSvg } from '@/libs/utils';

export default function CategoryItem({ data }: { data: ICategory }) {
    const sanitizedIcon = cleanSvg(data.icon);

    return (
        <div className="flex flex-col items-center justify-center space-y-1">
            <div
                className="w-5 h-5 [&_svg]:!w-full [&_svg]:!h-full [&_svg]:block text-gray-600"
                dangerouslySetInnerHTML={{ __html: sanitizedIcon }}
            />
            <div className="text-xs font-medium text-gray-700 text-center leading-tight">
                {data.name}
            </div>
        </div>
    );
}
