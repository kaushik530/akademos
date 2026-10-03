import { BookOpen } from 'lucide-react';
export default function Logo({compact=false}:{compact?:boolean}){return <div className="logo"><span className="logo-mark"><BookOpen size={17}/></span>{!compact&&<span>akadem<span className="logo-accent">o</span>s</span>}</div>}
