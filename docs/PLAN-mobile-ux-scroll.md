# PLAN-mobile-ux-scroll

## Task Breakdown
1. **[Layout Correção]** Ajustar `Hero.tsx` e `ThemeToggle.tsx` para evitar sobreposição na barra superior em telas menores de 360px. Usar um contêiner Flexbox protegido em vez de posicionamento `absolute` cru.
2. **[Navegação Mobile]** Implementar um menu Hamburger limpo ou Bottom Bar moderno (`MobileNavigation.tsx`) integrando as âncoras da página e fechando ao clicar.
3. **[Scroll Suave & Sliders]** 
   - Inicializar motor de Scroll (Depende de resposta: Lenis como fallback gratuito ou GSAP ScrollSmoother se licenciado).
   - Clarificar com o usuário a implementação do "Slice Slider" (provavelmente Embla Carousel ou Swiper para os elementos em slide).
4. **[Voltar ao Topo]** Desenvolver `BackToTop.tsx` usando Intersection Observer para aparecer dinamicamente e injetar em `App.tsx`.

## Agent Assignments
- `frontend-mobile-development-component-scaffold`: Para estruturar a navbar responsiva e o componente BackToTop.
- `mobile-security-coder`: Para verificar acessibilidade e validação de botões touch (44x44px minimum touch target).
- `project-planner`: Coordenação (este plano).

## Verification Checklist
- [ ] O logo e o ThemeToggle colidem na largura de 320px?
- [ ] O menu Hamburger abre/fecha sem travar o scroll subjacente (`overflow-hidden` no `body`)?
- [ ] O `BackToTop` oculta-se no topo absoluto da página?
- [ ] O scroll suave funciona nas âncoras internas?
- [ ] A rolagem horizontal (slider) tem snapping suave e área de toque polida no mobile?
