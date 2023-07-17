import React from 'react'

export default function TableValue(prop) {
    const { _id, bookName, bookCategory, bookTitle, bookAuthor } = prop.data

    return (
        <>
            <tr className="bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-4 w-4">
                    <div className="flex items-center">
                        <input value={_id} onClick={prop.fun} id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{bookName}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{bookAuthor}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{bookCategory}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{bookTitle}</td>
            </tr>
        </>
    )
}
