interface MenuItemProps {
  name: string;
  description: string;
  image: string;
  onClick: () => void;
}

const MenuItem = ({ name, description, image, onClick }: MenuItemProps) => {
  return (
    <div 
      onClick={onClick}
      className="group flex items-center gap-3 py-2 border-b border-border/40 hover:border-gold/30 transition-all duration-300 cursor-pointer active:scale-98"
    >
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-border group-hover:ring-gold/50 transition-all duration-300">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-base text-gold mb-0.5 group-hover:text-gold-muted transition-colors">
          {name}
        </h3>
        <p className="text-xs text-muted-foreground font-light">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
