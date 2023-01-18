import React from 'react';
import { ReactComponent as One } from '../../assets/images/1.svg';
import { ReactComponent as Two } from '../../assets/images/2.svg';
import { ReactComponent as Three } from '../../assets/images/3.svg';
import { ReactComponent as Four } from '../../assets/images/4.svg';
import { ReactComponent as Five } from '../../assets/images/5.svg';
import { ReactComponent as Six } from '../../assets/images/6.svg';
import { ReactComponent as Seven } from '../../assets/images/7.svg';
import { ReactComponent as G } from '../../assets/images/g.svg';
import { ReactComponent as L } from '../../assets/images/l.svg';
import { ReactComponent as A } from '../../assets/images/a.svg';
import { ReactComponent as C } from '../../assets/images/c.svg';
import { ReactComponent as E } from '../../assets/images/e.svg';
import { ReactComponent as B } from '../../assets/images/b.svg';
import { ReactComponent as D } from '../../assets/images/d.svg';
import { ReactComponent as F } from '../../assets/images/f.svg';
import { ReactComponent as M } from '../../assets/images/m.svg';
import { ReactComponent as N } from '../../assets/images/n.svg';
import { ReactComponent as Q } from '../../assets/images/q.svg';
import { ReactComponent as R } from '../../assets/images/r.svg';
import { ReactComponent as W } from '../../assets/images/w.svg';
import { ReactComponent as J } from '../../assets/images/j.svg';
import { ReactComponent as Z } from '../../assets/images/z.svg';
import { ReactComponent as SIR } from '../../assets/images/sir.svg';
import { ReactComponent as SRA } from '../../assets/images/s.svg';
import { ReactComponent as SFA } from '../../assets/images/s.svg';
import { ReactComponent as S42 } from '../../assets/images/s.svg';
import { ImageList, ImageListItem } from '@mui/material';

const RouteLogo = () => {
  const routes = [
    <One />,
    <Two />,
    <Three />,
    <Four />,
    <Five />,
    <Six />,
    <Seven />,
    <G />,
    <L />,
    <A />,
    <C />,
    <E />,
    <B />,
    <D />,
    <F />,
    <M />,
    <N />,
    <Q />,
    <R />,
    <W />,
    <J />,
    <Z />,
    <SIR />,
    <SRA />,
    <SFA />,
    <S42 />,
  ];

  return (
    <ImageList sx={{ width: 300 }} cols={3} rowHeight={90} gap={9}>
      {routes.map((route, index) => (
        <ImageListItem key={index} sx={{ opacity: '0.80' }}>
          {route}
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default RouteLogo;
