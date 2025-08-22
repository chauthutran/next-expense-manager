import { ICategory } from '@/libs/definations';

export default function CategoryItem({ data }: { data: ICategory }) {
    const sanitizedIcon = data.icon.replace(/class=/g, 'className=');

    return (
        <div className={`flex w-full items-center justify-center space-x-5`}>
            <div
                className="w-5 h-5"
                dangerouslySetInnerHTML={{ __html: sanitizedIcon }}
            />
            <div className="my-1 text-sm text-gray-700 font-semibold flex text-center">
                {data.name}
            </div>
        </div>
    );
}
