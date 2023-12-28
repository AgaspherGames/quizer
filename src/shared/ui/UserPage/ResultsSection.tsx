export function ResultsSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center text-cyan-500 mb-10">
          Результаты викторины
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="rounded-lg overflow-hidden shadow-lg bg-white text-black p-6">
            <div className="mb-4">
              <img
                alt="Quiz Image"
                className="w-full object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">Название викторины</h2>
            <p className="text-xl">Правильно: 75%</p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg bg-white text-black p-6">
            <div className="mb-4">
              <img
                alt="Quiz Image"
                className="w-full object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">Название викторины</h2>
            <p className="text-xl">Правильно: 60%</p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg bg-white text-black p-6">
            <div className="mb-4">
              <img
                alt="Quiz Image"
                className="w-full object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">Название викторины</h2>
            <p className="text-xl">Правильно: 80%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
