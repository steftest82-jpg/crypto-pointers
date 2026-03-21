import Image from 'next/image';
import type { FC } from 'react';

interface AuthorBioProps {
  compact?: boolean;
}

const AuthorBio: FC<AuthorBioProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30 flex-shrink-0">
          <Image
            src="http://img.b2bpic.net/premium-photo/person-business-businesswoman-woman-adult-female-smiling-portrait-office-horizontal-photog_1064589-402141.jpg"
            alt="Yosef Kamel — Lead Author at Crypto Pointers"
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <p className="font-bold text-text text-sm">Yosef Kamel</p>
          <p className="text-xs text-text/60">Lead Author & Crypto Analyst</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-accent/20">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-accent/30 flex-shrink-0">
          <Image
            src="http://img.b2bpic.net/premium-photo/person-business-businesswoman-woman-adult-female-smiling-portrait-office-horizontal-photog_1064589-402141.jpg"
            alt="Yosef Kamel — Lead Author at Crypto Pointers"
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-text mb-1">Yosef Kamel</h3>
          <p className="text-sm font-semibold text-primary mb-3">Lead Author & Crypto Analyst</p>
          <p className="text-sm text-text/70 leading-relaxed">
            Yosef Kamel is a seasoned crypto analyst and the founding voice behind Crypto Pointers.
            With deep roots in blockchain technology and decentralised finance, Yosef cuts through
            the noise to deliver bold, evidence-based insights that help readers navigate the
            fast-moving world of cryptocurrency. His mission: empower every investor — from curious
            beginner to battle-tested trader — with the knowledge to make confident decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
