import styled from 'styled-components/native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from '.';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;

export const Header = styled.View`
  padding: ${getStatusBarHeight() + 24}px 24px 24px;
  background: #393939;
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-family: ${'Montserrat-Medium'};
  line-height: 28px;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
})``;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  background: ${props => (props.selected ? '#0f43a9' : '#393939')};
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 36px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  font-family: ${'Montserrat-Medium'};
  font-size: 16px;
  margin-left: 8px;
  color: ${props => (props.selected ? '#ffffff' : '#ffffff')};
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: ${'Montserrat-Medium'};
  color: #ffffff;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #808080;
  font-family: ${'Montserrat-Medium'};
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
})``;

export const Hour = styled(RectButton).attrs((props: HourProps) => ({
  enabled: props.available,
}))<HourProps>`
  padding: 12px;
  background: ${props => (props.selected ? '#0f43a9' : '#393939')};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${props => (props.selected ? '#ffffff' : '#ffffff')};
  font-family: ${'VarelaRound-Regular'};
  font-size: 18px;
`;

export const CreateAppointmentButton = styled(RectButton)`
  background: #0f43a9;
  border-radius: 10px;
  height: 50px;
  margin: 0 24px 24px;
  justify-content: center;
  align-items: center;
`;

export const CreateAppointmentButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-family: ${'VarelaRound-Regular'};
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #0f43a9;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
  color: #ffffff;
  font-family: ${'VarelaRound-Regular'};
  font-size: 18px;
`;
