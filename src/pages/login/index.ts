export function loginInit() {
  const pageWrapper: HTMLDivElement = document.querySelector('.page-wrapper')!;

  pageWrapper.innerHTML = ` <form id="login-form" class="max-w-[450px] mx-auto" method="get">
      <h1
        class="text-4xl text-gray-900 block font-medium mb-2 mt-[30px] py-[10px]"
      >
        Login
      </h1>
      <div class="mb-5">
        <label for="email" class="text-gray-900 text-sm block font-medium mb-2"
          >Email</label
        >
        <input
          type="text"
          id="email"
          name="log-email"
          class="bg-gray-50 border border-gray-300 p-2.5 rounded-lg text-gray-900 text-sm w-[700px] block focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="text-gray-900 text-sm block font-medium mb-2"
          >Password</label
        >
        <input
          type="password"
          id="password"
          name="log-password"
          class="bg-gray-50 border border-gray-300 p-2.5 rounded-lg text-gray-900 text-sm w-[700px] block focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        id="login-btn"
        name="log-submit"
        class="bg-blue-700 rounded-lg text-[18px] text-center text-sm text-white w-full dark:bg-blue-200 dark:focus:ring-blue-800 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium hover:bg-blue-800 px-5 py-2.5 sm:w-auto"
      >
        Login
      </button>
    </form>`;
}
