import Icon from '@/types/Icon'
import VehicleType from '@/types/VehicleType'
import Nation from '@/types/Nation'

export default interface Vehicle {
  title: string
  description: string
  icons: Icon
  level: number
  type: VehicleType
  nation: Nation
}
