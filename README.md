What is Corract?

The Correct way to build React Preact apps, of course!

Corract is a super-opinionated, config focused, Preact framework that makes server-side rendering (SSR) simple and low-effort. Designed for developers who want to write code as if they’re building a traditional single-page app (SPA), Corract handles routing, layouts, and server/client data syncing through a strict, configuration-driven system. No server components neccesary, just client components that work seamlessly with server-side rendering. A clear separation between front end and back end you say?!

Corract doesn't aim to give you more flexibility—it intentionally gives you less. By taking control of your app’s structure and behavior through a central config, Corract eliminates architectural guesswork, file / directory organization problems, and general codebase decision fatigue. You focus on your components and data; Corract handles the rest.

User > Developer > Framework

Using the most familiar third party libraries like Preact, Express, Vite, and Tailwind CSS, Corract provides a robust foundation for building modern web applications without the complexity of some other frameworks. 👀 If you’re looking for a framework that prioritizes simplicity and developer experience, Corract is the right choice. It’s not just about building apps; it’s about building them the right way—with less hassle and more focus on what matters. The end user.

Key Ideas

🧠 “Just build the SPA” mentality – Write your app like a client-rendered SPA. Corract handles SSR and routing under the hood.

🗺 Config = Everything – Your config defines your routes, page structure, layouts, and server-side middleware behavior.

🏗 Auto-generated file structure – Corract generates exact file locations like src/pages/home/john/poo/index.tsx for the route /home/john/poo. You can drop in any extra files, but Corract only cares about index.tsx at each route.

🧩 Layout and middleware control per route – Each route can declare which layout wraps it and what server-side logic runs.

🔁 SSR without hydration mismatch – Corract guarantees that the HTML rendered on the server matches what the client expects, so no hydration surprises. The client simply takes over.

🛣 Client-side routing triggers backend middleware – When navigating on the client, Corract still fetches the route’s server middleware data to keep things in sync.

NOTE: Corract is still in early development, so expect some rough edges and missing features.
