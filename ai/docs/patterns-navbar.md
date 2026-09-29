# Navbar

    ),
  }}
  extras={[
    { title: 'With icons and actions', story: 'WithIconsAndActions' },
    { title: 'Narrow screens', story: 'Narrow' },
  ]}
  behaviorStory="RightToLeft"
  matrix={
    <Navbar
      aria-label="Theme matrix"
      logo={<Logo name="TechHub" hideName />}
      items={[
        { label: 'Products', href: '#products' },
        { label: 'Pricing', href: '#pricing' },
      ]}
      currentItem="Products"
    />
  }
/>
