import { AnniversaryBanner } from '../components/AniversaryBanner'
import { BentoSection } from '../components/BentoSection'
import { HeroSection } from '../components/HeroSection'
import { PastoralSection } from '../components/PastoralSection'
import { ScheduleSection } from '../components/ScheduleSection'
import VerseOfTheDay from '../components/VerseOfTheDay'

const Home = () => (
  <>
    <HeroSection />
    <PastoralSection />
    <AnniversaryBanner />
    <VerseOfTheDay apiKey={import.meta.env.VITE_BIBLE_API_KEY} />
    <ScheduleSection />
    <BentoSection />
  </>
)

export default Home
