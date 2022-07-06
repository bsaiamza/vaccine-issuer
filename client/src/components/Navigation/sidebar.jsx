// mui5
import { Divider, Drawer } from '@mui/material'
// mui5 icons
import {
  Badge,
  FileCopy,
  Fingerprint,
  Home,
  LeakAdd,
  Schema,
} from '@mui/icons-material'
// react-router-dom
import { NavLink } from 'react-router-dom'
// components
import BoxComponent from '../Box'
import ChipComponent from '../Chip'
import ListComponent from '../List'
import ListItemComponent from '../ListItem'
import ListItemButtonComponent from '../ListItemButton'
import ListItemIconComponent from '../ListItemIcon'
import ListItemTextComponent from '../ListItemText'

const Sidebar = ({ handleCloseDrawer, openDrawer }) => {
  return (
    <Drawer anchor="right" onClose={handleCloseDrawer} open={openDrawer}>
      <BoxComponent sx={{ textAlign: 'center', m: '1rem' }}>
        <ChipComponent
          icon={<Fingerprint sx={{ color: '#faa61a !important' }} />}
          label="Issuer"
          sx={{
            backgroundColor: '#faa61a41',
            borderColor: '#faa61a',
            boxShadow: '5',
            color: '#faa61a',
            width: '8rem',
          }}
          variant="outlined"
        />
      </BoxComponent>
      <Divider sx={{ marginBottom: '1rem' }} />
      <ListComponent>
        <NavLink
          to="/"
          className={({ isActive }) =>
            openDrawer
              ? isActive
                ? 'link-active'
                : 'link'
              : isActive
              ? 'link-active'
              : 'link'
          }
        >
          <ListItemComponent disablePadding>
            <ListItemButtonComponent onClick={handleCloseDrawer}>
              <ListItemIconComponent>
                <Home />
              </ListItemIconComponent>
              <ListItemTextComponent primary="Home" />
            </ListItemButtonComponent>
          </ListItemComponent>
        </NavLink>

        <NavLink
          to="/schemas"
          className={({ isActive }) =>
            openDrawer
              ? isActive
                ? 'link-active'
                : 'link'
              : isActive
              ? 'link-active'
              : 'link'
          }
        >
          <ListItemComponent disablePadding>
            <ListItemButtonComponent onClick={handleCloseDrawer}>
              <ListItemIconComponent>
                <Schema />
              </ListItemIconComponent>
              <ListItemTextComponent primary="Schemas" />
            </ListItemButtonComponent>
          </ListItemComponent>
        </NavLink>

        <NavLink
          to="/credential-definitions"
          className={({ isActive }) =>
            openDrawer
              ? isActive
                ? 'link-active'
                : 'link'
              : isActive
              ? 'link-active'
              : 'link'
          }
        >
          <ListItemComponent disablePadding>
            <ListItemButtonComponent onClick={handleCloseDrawer}>
              <ListItemIconComponent>
                <FileCopy />
              </ListItemIconComponent>
              <ListItemTextComponent primary="Definitions" />
            </ListItemButtonComponent>
          </ListItemComponent>
        </NavLink>

        <NavLink
          to="/connections"
          className={({ isActive }) =>
            openDrawer
              ? isActive
                ? 'link-active'
                : 'link'
              : isActive
              ? 'link-active'
              : 'link'
          }
        >
          <ListItemComponent disablePadding>
            <ListItemButtonComponent onClick={handleCloseDrawer}>
              <ListItemIconComponent>
                <LeakAdd />
              </ListItemIconComponent>
              <ListItemTextComponent primary="Connections" />
            </ListItemButtonComponent>
          </ListItemComponent>
        </NavLink>

        <NavLink
          to="/credentials"
          className={({ isActive }) =>
            openDrawer
              ? isActive
                ? 'link-active'
                : 'link'
              : isActive
              ? 'link-active'
              : 'link'
          }
        >
          <ListItemComponent disablePadding>
            <ListItemButtonComponent onClick={handleCloseDrawer}>
              <ListItemIconComponent>
                <Badge />
              </ListItemIconComponent>
              <ListItemTextComponent primary="Credentials" />
            </ListItemButtonComponent>
          </ListItemComponent>
        </NavLink>

        <NavLink
          to="/holder"
          className={({ isActive }) =>
            openDrawer
              ? isActive
                ? 'link-active'
                : 'link'
              : isActive
              ? 'link-active'
              : 'link'
          }
        >
          <ListItemComponent disablePadding>
            <ListItemButtonComponent onClick={handleCloseDrawer}>
              <ListItemIconComponent>
                <Badge />
              </ListItemIconComponent>
              <ListItemTextComponent primary="Holder Form" />
            </ListItemButtonComponent>
          </ListItemComponent>
        </NavLink>
      </ListComponent>
    </Drawer>
  )
}

export default Sidebar
