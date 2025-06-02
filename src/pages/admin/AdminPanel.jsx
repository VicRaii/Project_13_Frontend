import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import SeriesManager from './SeriesManager'
import PreachingsManager from './PreachingsManager'
import UsersManager from './UsersManager'
import ContactsManager from './ContactsManager'

const AdminPanel = () => {
  return (
    <Tabs isFitted variant='enclosed'>
      <TabList mb='1em'>
        <Tab>Series</Tab>
        <Tab>Predicaciones</Tab>
        <Tab>Usuarios</Tab>
        <Tab>Mensajes</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SeriesManager />
        </TabPanel>
        <TabPanel>{<PreachingsManager />}</TabPanel>
        <TabPanel>
          <UsersManager />
        </TabPanel>
        <TabPanel>
          <ContactsManager />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default AdminPanel
