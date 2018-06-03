import { StackNavigator } from 'react-navigation'

import UserInfoForms from './UserInfoForms'
import CameraDashboardContainer from './CameraDashboardContainer'
import ResultsContainer from './ResultsContainer'

const AppNavigator = StackNavigator({
  CameraDashboardContainer: { 
    screen: CameraDashboardContainer,
    navigationOptions: {
      header: null,
    }
  },
  UserInfoForms: { 
    screen: UserInfoForms,
    navigationOptions: {
      header: null
    }
  },
  ResultsContainer: {
    screen: ResultsContainer,
    navigationOptions: {
      header: null
    }
  }
})

export default AppNavigator 

