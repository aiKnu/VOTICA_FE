import Image from 'next/image';

const demos = [
  {
    title: '쇼핑몰 Demo',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    waveColor: 'bg-blue-500',
    desc: 'AI 상담 데모',
  },
  {
    title: 'Wedding Demo',
    video: 'https://www.youtube.com/embed/tgbNymZ7vqY',
    waveColor: 'bg-green-400',
    desc: '결혼정보 데모',
  },
  {
    title: 'Survey Demo',
    video: 'https://www.youtube.com/embed/ysz5S6PUM-U',
    waveColor: 'bg-orange-400',
    desc: '설문조사 데모',
  },
];

export default function DemoSection() {
  return (
    <section className="py-20 bg-black">
      <h2 className="text-3xl font-bold text-center mb-12">서비스 시연 영상</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {demos.map((demo, i) => (
          <div key={i} className="bg-gray-900 rounded-2xl shadow-2xl p-6 w-full md:w-1/3 hover:scale-105 transition flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <Image src="/votica-logo.png" alt="VOTICA" width={28} height={28} />
              <span className="text-white font-semibold text-lg">{demo.title}</span>
            </div>
            <div className={`w-full h-2 rounded-full mb-4 ${demo.waveColor}`}></div>
            <iframe
              width="100%"
              height="220"
              src={demo.video}
              title={demo.title}
              className="rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <p className="mt-4 text-center text-lg text-gray-200">{demo.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button className="w-10 h-10 rounded-full bg-gray-800 text-white text-2xl flex items-center justify-center hover:bg-gray-700">&#8592;</button>
        <button className="w-10 h-10 rounded-full bg-gray-800 text-white text-2xl flex items-center justify-center hover:bg-gray-700">&#8594;</button>
      </div>
    </section>
  );
}
