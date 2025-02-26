export default function Accordion({ items }) {
    return (
        <div id="accordion-open" data-accordion="open">
            { items.map((item, index) => (
                <>
                    <h2 id={`accordion-open-heading-${index}`} key={index}>
                        <button type="button"
                                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                                data-accordion-target="#accordion-open-body-1" aria-expanded="true"
                                aria-controls="accordion-open-body-1">
                            <span className="flex items-center">{ item.title }</span>
                            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M9 5 5 1 1 5"/>
                            </svg>
                        </button>
                    </h2>
                    <div id="accordion-open-body-1" className="hidden" aria-labelledby="accordion-open-heading-1">
                        { item.body }
                    </div>
                </>
            ))}
        </div>
    )
}