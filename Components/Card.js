import moment from 'moment/moment';
import React from 'react'

function Card({transaction}) {
    moment(transaction?.Date).format("DDD MMM YYYY")
    console.log(transaction)
  return (
    <div class="flex justify-center p-2">
      <div class="block p-6 rounded-xl shadow-lg bg-green-200 max-w">
        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
          {transaction?.name}
        </h5>
        <p class="text-gray-700 text-base mb-4">
          Date {moment(transaction?.Date).format("Do ddd MMM yyyy")}
        </p>
        <button
          type="button"
          class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Button
        </button>
      </div>
    </div>
  );
}

export default Card