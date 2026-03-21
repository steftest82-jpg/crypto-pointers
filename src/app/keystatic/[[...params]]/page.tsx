import KeystaticApp from '@keystatic/next/ui/app';
import config from '../../../../keystatic.config';

export default function KeystaticPage() {
  return <KeystaticApp config={config} />;
}
