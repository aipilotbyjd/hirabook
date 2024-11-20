import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTranslation } from 'react-i18next';

type LocalizedTextProps = {
  translationKey: string;
  values?: any;
} & TextProps;

export const LocalizedText: React.FC<LocalizedTextProps> = ({ translationKey, values, style, ...props }) => {
  const { t } = useTranslation();
  return (
    <Text style={style} {...props}>
      {t(translationKey, values)}
    </Text>
  );
};
